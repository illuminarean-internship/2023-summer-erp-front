import axios from 'axios';
import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async signIn(user) {
            // Fetch admin information from the database
            try {
                const response = await axios.get(
                    `http://internship-server.illuminarean.com:4040/api/users/check?email=${user.user.email}`,
                ); // Adjust the API endpoint
                const { isAdmin } = response.data; // Assuming the response structure has an isAdmin field
                return isAdmin ? true : false;
            } catch (error) {
                console.error('Error fetching admin data:', error);
                return false; // Deny sign in on error
            }
        },
    },
    secret: process.env.JWT_SECRET,
    session: {
        strategy: 'jwt',
    },
});
