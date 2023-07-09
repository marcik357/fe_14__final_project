import { Facebook, Instagram, Linkedin, Twitter } from "../Icons";

export const getSocialIcon = (type) => {
    switch (type.toLowerCase()) {
        case 'facebook':
            return <Facebook />;
        case 'instagram':
            return <Instagram />;
        case 'linkedin':
            return <Linkedin />;
        case 'twitter':
            return <Twitter />;
        default:
            return null;
    }
};