import cron from 'node-cron';
import mongoose from 'mongoose';

export const startDailyResetCron = (database?: any) => {
    // Schedule to run every day at 00:00 (midnight) in server's timezone
    const dailyResetJob = cron.schedule('0 0 * * *', async () => {
        try {
            // Use the provided database or default mongoose connection
            const db = database || mongoose;
            
            // Get the User model
            let User;
            try {
                User = db.model('user');
            } catch (error) {
                // If model doesn't exist, create it
                const createUserModel = require('../models/user').default;
                User = createUserModel(db);
            }
            
            // Reset tasksDone for all users directly
            const result = await User.updateMany(
                {}, // Update all users
                { 
                    $set: { 
                        tasksDone: 0 
                    } 
                }
            );
            
            const now = new Date();
       
        } catch (error) {
        }
    }, {
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone // Use server's timezone
    });

    // Start the cron job
    dailyResetJob.start();
    
    const now = new Date();
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return dailyResetJob;
};