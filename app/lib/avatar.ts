export function getAvatarURL(name: string) {
  return `https://api.dicebear.com/9.x/initials/svg?seed=${name}`;
}
