const paths = {
  ROOT: '/',
  SIGNUP: '/register',
  SIGNIN: '/login',
  SIGNINKEP: '/login/kep',
  PROFILE: 'admin/profile',
  USERS: 'admin/users',
  EDITUSERS: 'admin/users/:id/edit',
  CREATEUSERS: 'admin/users/create',
  ROLES: 'admin/roles',
  EDITROLES: 'admin/roles/:id/edit',
  CREATROLES: 'admin/roles/create',
  IMAGES: 'admin/images',
  FILES: 'admin/files',
} as const;

export { paths };
