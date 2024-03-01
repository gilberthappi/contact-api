
import { CONTACT } from '../../models';
import { transporter } from '../../utils/mailTransport.js';

export const createContact = async (req, res) => {
  try {
    const newContact = await CONTACT.create(req.body);

    if (!newContact) {
      return res.status(400).json({ message: 'Bad Request - Invalid data' });
    }

    console.log('Recipient Email:', newContact.email);

    // Send a welcome email to the user
    const mailOptions = {
      from: 'gdushimimana6@gmail.com',
      to: newContact.email,
      subject: 'Thank You for Contacting Me',
      html: `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                padding: 20px;
                margin: 0;
              }
              .container {
                max-width: 600px;
                margin: auto;
                background: #fff;
                padding: 20px;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              h1 {
                color: #333;
                text-align: center;
              }
              p {
                margin-bottom: 20px;
                line-height: 1.6;
              }
              .signature {
                text-align: center;
                margin-top: 20px;
                color: #777;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Thank You for Contacting Me</h1>
              <p>Dear ${newContact.name},</p>
              <p>Thank you for reaching out to us. We have received your message and will get back to you as soon as possible.</p>
              <div class="signature">
                <p>Best regards,<br>Eng Happi Gilbert</p>
              </div>
            </div>
          </body>
        </html>
      `
    };
    

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Email sending failed:', error);
        return res.status(500).json({ message: 'Failed to send email' });
      } else {
        console.log('Email sent:', info.response);

        // Respond to the client
        res.status(201).json({
          message: 'Message sent successfully',
          contact: newContact,
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getContacts = async (req, res) => {
  try {
    const contacts = await CONTACT.find();
    contacts.sort((a, b) => b.date - a.date);
    res.status(200).json({
      message:'All Contact',
      contacts,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getContactById = async (req, res) => {
  try {
    const contactId = req.params.id;
    const contact = await CONTACT.findById(contactId);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json(contact);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    const deletedContact = await CONTACT.findByIdAndDelete(contactId);

    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateContactAdminResponse = async (req, res) => {
  const contactId = req.params.id;
  const { adminResponse } = req.body;

  try {
      const contact = await CONTACT.findByIdAndUpdate(
          contactId,
          { adminResponse },
          { new: true }
      );

      if (!contact) {
          return res.status(404).json({ message: 'Contact not found' });
      }

      // Send an email to the user
 // Send a welcome email to the user
 const mailOptions = {
  from: 'gdushimimana6@gmail.com',
  to: contact.email,
  subject: 'Welcome to Happi Portfolio',
  text: `.......Thanks for contact us..... 
  ${adminResponse}`,
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Email sending failed:', error);
    return res.status(500).json({ message: 'Failed to send email' });
  } else {
    console.log('Email sent:', info.response);

    // Respond to the client
    res.status(200).json({ 
      message: 'Admin response added successfully',
      contact: contact,
    });
  }
});


  } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Internal server error' });
  }
};