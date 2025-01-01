export const cookieConfig = {
    httpOnly: true, // Prevents client-side access to the cookie through JavaScript
    secure: process.env.NODE_ENV === 'production', // Only sends cookie over HTTPS in production
    sameSite: 'strict' as const, // Protects against CSRF
    maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
    path: '/', // Cookie is available for all paths
};