
export const contactForm = [
  {
    tagType: 'regular',
    label: "Name",
    id: "name",
    name: "name",
    type: "text",
    placeholder: "Enter your name",
  },
  {
    tagType: 'regular',
    label: "Email",
    id: "email",
    name: "email",
    type: "text",
    placeholder: "Enter your email",
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
    label: "Wallet Number",
    id: "wallet",
    name: "wallet",
    type: "text",
    placeholder: "0x81b8172c80d146ed80d7d6cbb2f7ca807602b493",
  }
];