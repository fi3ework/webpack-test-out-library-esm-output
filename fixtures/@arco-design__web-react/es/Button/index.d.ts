import React from 'react';
import Group from './group';
import { ButtonProps } from './interface';
declare const ButtonComponent: React.ForwardRefExoticComponent<Partial<{
    htmlType?: "button" | "submit" | "reset";
} & import("./interface").BaseButtonProps & Omit<React.ButtonHTMLAttributes<any>, "className" | "onClick" | "type"> & {
    href: string;
    target?: string;
    anchorProps?: React.HTMLProps<HTMLAnchorElement>;
} & Omit<React.AnchorHTMLAttributes<any>, "className" | "onClick" | "type">> & React.RefAttributes<unknown>> & {
    __BYTE_BUTTON: boolean;
    Group: typeof Group;
};
export default ButtonComponent;
export { ButtonProps };