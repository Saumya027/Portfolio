import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

interface IconProps {
  size?: number;
  className?: string;
}

export function GithubIcon({ size = 18, className = "" }: IconProps) {
  return <FaGithub size={size} className={className} />;
}

export function LinkedinIcon({ size = 18, className = "" }: IconProps) {
  return <FaLinkedin size={size} className={className} />;
}

export function LeetcodeIcon({ size = 18, className = "" }: IconProps) {
  return <SiLeetcode size={size} className={className} />;
}
