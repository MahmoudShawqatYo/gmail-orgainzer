# Gmail Auto Organizer

## Overview
This Google Apps Script automates email organization in Gmail by labeling unread emails
based on predefined keywords in the subject.
If a relevant label does not exist, the script creates it.

## Features
- Searches for unread emails.
- Assigns labels based on subject keywords.
- Creates labels if they do not exist.

## Installation
1. Open [Google Apps Script](https://script.google.com/).
2. Create a new project and copy-paste the script below.
3. Click `Run` to execute the script.
4. Authorize necessary permissions.
5. Optionally, set up a trigger to run the script automatically.

## Usage
1. Define keyword-label pairs in the `labelRules` array.
2. Run the script to label unread emails accordingly.
3. View labeled emails in Gmail.

## Code
```javascript
function organizeEmails() {
  var labelRules = [
    { keyword: "Invoice", label: "Invoices" },
    { keyword: "Meeting", label: "Meetings" },
    { keyword: "Urgent", label: "Urgent" }
  ];
  
  var threads = GmailApp.search("is:unread");
  
  threads.forEach((thread)=> {
    var messages = thread.getMessages();
    messages.forEach((message)=> {
      var subject = message.getSubject();
      
      labelRules.forEach((rule)=> {
        if (subject.includes(rule.keyword)) {
          var label = GmailApp.getUserLabelByName(rule.label);
          if (!label) {
            label = GmailApp.createLabel(rule.label);
          }
          thread.addLabel(label);
        }
      });
    });
  });
}
```

## Automation
To automatically run the script:
1. Open Google Apps Script.
2. Click `Triggers` (clock icon on the left sidebar).
3. Set the function `organizeEmails` to run periodically (e.g., hourly).

## License
This project is licensed under the MIT License.
