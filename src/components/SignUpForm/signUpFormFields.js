export const signInFormFields = [
  {
    tagType: 'regular',
    label: "First name",
    id: "firstName",
    name: "firstName",
    type: "text",
    placeholder: "John",
  },
  {
    tagType: 'regular',
    label: "Last Name",
    id: "lastName",
    name: "lastName",
    type: "text",
    placeholder: "Smith",
  },
  {
    tagType: 'regular',
    label: "Login",
    id: "login",
    name: "login",
    type: "text",
    placeholder: "JohnSmith",
  },
  {
    tagType: 'regular',
    label: "Email",
    id: "email",
    name: "email",
    type: "email",
    placeholder: "example@gmail.com",
  },
  {
    tagType: 'regular',
    label: "Password",
    id: "password",
    name: "password",
    type: "text",
    placeholder: "******",
  },
  {
    tagType: 'masked',
    label: "Phone number",
    id: "telephone",
    name: "telephone",
    type: "text",
    format: "+380#########",
    mask: "#",
  },
  {
    tagType: 'regular',
    label: "Wallet number",
    id: "wallet",
    name: "wallet",
    type: "text",
    placeholder: "0x4Qbzg...",
  }
]
