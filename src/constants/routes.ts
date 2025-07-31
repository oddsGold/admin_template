const paths = {
    ROOT: '/',
    SIGNUP: '/register',
    SIGNIN: '/login',
    SIGNINKEP: '/login/kep',
    PROFILE: 'admin/profile',
    USERS: 'admin/users',
    EDITUSERS: 'admin/users/:id/edit',
    CREATEUSERS: 'admin/users/create',
} as const;

export { paths };
