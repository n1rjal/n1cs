export const encodedContactLinks = {
  email: "bWFpbHRvOm5pcmphbHBhdWRlbDU0MzEyQGdtYWlsLmNvbQ==",
  whatsapp:
    "aHR0cHM6Ly9hcGkud2hhdHNhcHAuY29tL3NlbmQ/cGhvbmU9OTc3OTg2Mzk0ODA4MSZ0ZXh0PUhpJTIwTmlyamFsJTJDJTIwSSUyMGFtJTIwaGVyZSUyMGZyb20lMjB5b3VyJTIwd2Vic2l0ZSUyQyUyMEklMjBhbSUyMHdpbGxpbmclMjB0byUyMGNoYXQlMjB0byUyMHlvdSUyMG9uJTIwZmV3JTIwdGhpbmdzLiUyMEFyZSUyMHlvdSUyMHVwJTIwZm9yJTIwaXQlMjAlM0Y=",
};

export const decodeContactLink = (encodedValue: string) => atob(encodedValue);
