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
      
      labelRules.forEach((rule)=>{
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