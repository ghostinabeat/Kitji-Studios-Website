import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema } from "@shared/schema";
import { z } from "zod";
import { sendContactEmail } from "./email";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSubmissionSchema.parse(req.body);
      
      // Store in database
      const submission = await storage.createContactSubmission(contactData);
      
      // Send email notification
      const emailSent = await sendContactEmail(contactData);
      
      if (emailSent) {
        res.json({ 
          success: true, 
          message: "Thank you for your message! We've received it and will get back to you within 24 hours.",
          id: submission.id 
        });
      } else {
        // Email failed but form was saved
        res.json({ 
          success: true, 
          message: "Thank you for your message! We've received it. If urgent, please contact support@kitjistudios.com directly.",
          id: submission.id 
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Please check your form data and try again.",
          errors: error.errors 
        });
      } else {
        console.error("Contact form error:", error);
        res.status(500).json({ 
          success: false, 
          message: "Sorry, there was an error sending your message. Please try again later." 
        });
      }
    }
  });

  // Get all contact submissions (for admin purposes)
  app.get("/api/contact", async (req, res) => {
    try {
      const submissions = await storage.getAllContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      res.status(500).json({ 
        success: false, 
        message: "Error retrieving contact submissions" 
      });
    }
  });

  // Simple admin page to view contact submissions
  app.get("/admin/contacts", async (req, res) => {
    try {
      const submissions = await storage.getAllContactSubmissions();
      
      let html = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Contact Submissions - Kitji Studios</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
            .container { max-width: 1200px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            h1 { color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px; }
            .submission { border: 1px solid #ddd; margin: 20px 0; padding: 20px; border-radius: 5px; background: #fafafa; }
            .meta { color: #666; font-size: 0.9em; margin-bottom: 10px; }
            .field { margin: 10px 0; }
            .field strong { color: #333; }
            .message { background: white; padding: 15px; border-left: 4px solid #007bff; margin: 10px 0; }
            .no-submissions { text-align: center; color: #666; font-style: italic; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Contact Submissions for support@kitjistudios.com</h1>
      `;
      
      if (submissions.length === 0) {
        html += '<p class="no-submissions">No contact submissions yet.</p>';
      } else {
        submissions.forEach(submission => {
          html += `
            <div class="submission">
              <div class="meta">Submitted: ${submission.createdAt.toLocaleString()}</div>
              <div class="field"><strong>Name:</strong> ${submission.name}</div>
              <div class="field"><strong>Email:</strong> ${submission.email}</div>
              <div class="field"><strong>Company:</strong> ${submission.company || 'Not provided'}</div>
              <div class="field"><strong>Project Type:</strong> ${submission.projectType}</div>
              <div class="field"><strong>Budget:</strong> ${submission.budget || 'Not specified'}</div>
              <div class="message">
                <strong>Message:</strong><br>
                ${submission.message.replace(/\n/g, '<br>')}
              </div>
            </div>
          `;
        });
      }
      
      html += `
          </div>
        </body>
        </html>
      `;
      
      res.send(html);
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      res.status(500).send("Error loading contact submissions");
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
