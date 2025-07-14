# Element Financial - Customer Onboarding

A simple web application for customer onboarding with identity verification, built for the Alloy Technical Assessment.

## What This Project Does

This application allows new customers to submit their personal information through a form, which is then verified using Alloy's identity verification service. The application will approve, deny, or flag applications for manual review based on the information provided.

## Technologies Used

- **Frontend**: React (for the user interface)
- **Backend**: Node.js with Express (for the server)
- **API**: Alloy Identity Verification
- **Styling**: Custom CSS

## How to Run the Project

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   - Create a `.env` file in the root directory
   - Add your Alloy API credentials:
     ```
     ALLOY_WORKFLOW_TOKEN=your_token_here
     ALLOY_WORKFLOW_SECRET=your_secret_here
     ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and go to `http://localhost:3000`

## How It Works

1. Users fill out a form with their personal information
2. The form validates the input on the frontend
3. The information is sent to our backend server
4. Our server forwards the data to Alloy's API for verification
5. The result (Approved, Denied, or Manual Review) is displayed to the user

## Testing with Sandbox Data

For testing purposes, you can use these last names to trigger different responses:
- **"Approve"** - Application will be approved
- **"Deny"** - Application will be denied
- **"Review"** - Application will be flagged for manual review

## License

This project uses the MIT License (see LICENSE file for details).

---

*Built as part of the Technical Account Manager Assessment*