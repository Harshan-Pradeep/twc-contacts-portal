export const cookieConfig = {
    httpOnly: true,
    secure: false,
    sameSite: 'strict' as const,
    maxAge: 24 * 60 * 60 * 1000,
    path: '/',
};