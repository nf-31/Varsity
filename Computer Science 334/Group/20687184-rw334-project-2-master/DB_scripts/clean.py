# Authors: Daniël Brand 23111429, Joubert Visagie 22983856
# Python script: Creates a cleaned csv file from emails.csv

import pandas as pd
import re
import csv

DEBUG = False
FULL_ClEAN = True


def clean_emails(email_string):
    if not email_string:
        return email_string

    str = re.sub(r"[\n\t\s]", "", email_string)
    list = str.split(",")
    new_list = []
    for email in list:
        # Skip non-enron emails, large email addresses and system emails
        if re.search(r"^[a-zA-z0-9]+\.[a-zA-z0-9]+@enron.com$", email) and len(email) <= 127 and\
                email_address != 'outlook-migration-team@enron.com':
            if not re.search(r"^[\w.'%+-]+@[\da-zA-Z.-]+\.[a-zA-Z]{2,4}$", email):
                email = 'no.address@enron.com'
            else:
                # Find and replace redacted emails, like a..surname@enron.com
                if re.search(r'.*[.]{2}.*@enron\.com', email):
                    email = 'undisclosed-recepients@enron.com'
            new_list.append(email)
    new_str = ','.join(new_list)
    return new_str


if FULL_ClEAN:
    data = pd.read_csv('emails.csv')
else:
    test_chunk = pd.read_csv('emails.csv', chunksize=10000)
    data = next(test_chunk)

data.info()

csv_file = open("parsed.csv", "w")
writer = csv.writer(csv_file, delimiter=',', quoting=csv.QUOTE_ALL)

row_data = 'filename', 'first_name', 'last_name', 'email_address', 'date', 'message_id', 'subject', 'folder', 'to',\
           'cc', 'bcc', 'body', 'reference_text'
writer.writerow(row_data)

i = 0

print(
    "------------------------------------------------------------ Begin of first sweep ------------------------------------------------------------")

for row in data.values:

    filename = row[0]

    # Ignore all emails from these folders. The Enron study detailed any email in these folders to duplicates.
    if filename.find('_sent_mail') != -1:
        continue
    elif filename.find('discussion_threads') != -1:
        continue
    elif filename.find('all_documents') != -1:
        continue

    if DEBUG:
        print(
            "------------------------------------------------------------ E-mail ------------------------------------------------------------")

    message = row[1]

    # Find the location of the word "X-FileName" in the e-mail:
    split_location_x_folder = message.find("X-FileName")
    # Find the location of the nearsest "\n" after the word "X-FileName":
    split_location = message.find("\n\n", split_location_x_folder)
    # Split on the location of the newline:
    metadata = message[0:split_location]
    body = message[split_location:]
    body = body.strip()
    # MySQL TEXT field can only hold 21,844 characters
    if len(body) > 21844:
        continue

    email_address = ""
    date = ""
    message_id = ""
    subject = ""
    folder = ""
    to = ""
    cc = ""
    bcc = ""
    reference_text = ""

    # TODO: Check outlook-migration-team@enron.com
    # arsystem@mailman.enron.com
    # 'outlook.team@enron.com'

    email_address_result = re.search(r'(?<=From: ).*', metadata)
    if email_address_result:
        email_address = email_address_result.group()

        # Find out if the email is in a valid format. If it't invalid it gets the 'no.address@enron.com'.
        # Else move forward with cleaning
        email_address = clean_emails(email_address)

        if not email_address:
            continue

        if DEBUG:
            print("Email_address: " + email_address)

    # Split the email up into the firstname and lastname. If there is no lastname, the last name is then ""
    fullname_before_split = email_address.split('@')[0]
    fullname_after_split = fullname_before_split.split('.')
    first_name = fullname_after_split[0]
    if len(fullname_after_split) < 2:
        last_name = ''
    else:
        last_name = fullname_after_split[1]

    if DEBUG:
        print('FirstName: ' + first_name)
        print('LastName: ' + last_name)

    # Extract the date and format it neatly with Pandas
    date_result = re.search(r'(?<=Date: ).*', metadata)
    if date_result:
        date = pd.to_datetime(date_result.group())
        if DEBUG:
            print("Date: " + str(date))

    # Extract the message ID
    message_id_result = re.search(r'(?<=Message-ID: ).*', metadata)
    if message_id_result:
        message_id = message_id_result.group()
        if DEBUG:
            print("Message-ID: " + message_id)

    # Extract the subject. The subject can span many lines and it checks when it ends with "Cc" or "Mime-Version"
    subject_result = re.search(r'(?<=Subject: )(.|\n)*?(?=\nCc:|\nMime-Version)', metadata)
    if subject_result:
        subject = subject_result.group()
        if DEBUG:
            print("Subject: " + subject)

    # Extract the folder. TODO: Find out if this is correct? Not important for now
    folder_result = re.search(r'(?<=X-Folder: ).*', metadata)
    if folder_result:
        folder = folder_result.group()
        if DEBUG:
            print("Folder: " + folder)

    # Extract the to. If it has no "To:" I believe it's an email meant for a group and therefore I extract the "X-To:"
    # which seems to be the group name. Any weird and funny stuf between "< >" gets removed.
    to_result = re.search(r'(?<=To: )(.|\n)*(?=\nSubject:)', metadata)
    if to_result:
        to = to_result.group()
        if to == "All Enron Worldwide@ENRON ":
            print("")
        to = clean_emails(to)
    else:
        x_to_result = re.search(r'(?<=X-To: ).*', metadata)
        if x_to_result:
            to_before_sub = x_to_result.group()
            to = re.sub(r'<.*>', '', to_before_sub)
            to = to.strip()
            if len(to) > 127:
                continue
    if DEBUG:
        print("To: " + to)

    # Extract the "Cc"
    cc_result = re.search(r'(?<=Cc: )(.|\n)*(?=\nMime-Version:)', metadata)
    if cc_result:
        cc = cc_result.group()
        cc = clean_emails(cc)
        if DEBUG:
            print("Cc: " + cc)

    # Extract the "Bcc"
    bcc_result = re.search(r'(?<=Bcc: )(.|\n)*(?=\nX-From:)', metadata)
    if bcc_result:
        bcc = bcc_result.group()
        bcc = clean_emails(bcc)
        if DEBUG:
            print("Bcc: " + bcc)

    # Extract the reference text. Its either a reply or a forward. It only matches the first reply or forward. Any replies
    # or forwards nested within the reply or forward are included in the referenced text.
    reference_text_result = re.search(r'(-{5}Original Message[\s\S]*)|(-{22} Forwarded by [\s\S]*)', body)
    if reference_text_result:
        reference_text = reference_text_result.group()
        if len(reference_text) > 21844:
            continue

        if DEBUG:
            print("Reference_text:\n" + reference_text)

    # Writes the data to a csv file
    row_data = filename, first_name, last_name, email_address, date, message_id, subject, folder, to, cc, bcc, body,\
               reference_text
    writer.writerow(row_data)
    i += 1

# IMPORTANT!
# In the follwing code I close the csv file in the previous section an open the new parsed csv file to be cleaned further
# I don't know of a better way to do this an this way seems to work just fine.

# Close the current csv_file now that we are done with it
csv_file.close()

# Open the previously created csv file, with parsed data.
data = pd.read_csv('parsed.csv')
data.info()
print(
    "------------------------------------------------------------ Beginning second sweep ------------------------------------------------------------")

# Drop all empty messages
data.dropna(subset=['body'], inplace=True)
data.info()
# Drop duplicate messages
data.drop_duplicates(subset='body', keep="first", inplace=True)
print(
    "------------------------------------------------------------ End of second sweep. Writing to 'parsed_second_pass.csv' ------------------------------------------------------------")
# Output the final product: All clean emails
data.to_csv('parsed_second_pass.csv', quoting=csv.QUOTE_ALL)
data.info()
