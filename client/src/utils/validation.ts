
export const validateRoomId = (roomId: string) => {
    if (!roomId.trim()) {
      return "Room ID is required";
    }
    if (roomId.length > 6) {
      return "Room ID must be 6 characters or fewer";
    }
    return "";
  };
  
  export const validatePassword = (password: string, isSecured: boolean) => {
    if (isSecured) {
      if (!password.trim()) {
        return "Password is required for a secured room";
      }
      if (password.length < 5) {
        return "Password must be at least 5 characters";
      }
      if (password.length > 10) {
        return "Password must be 10 characters or fewer";
      }
    }
    return "";
  };
  
  export const validateNickname = (nickname: string): string | null => {
    
    if (!nickname.trim()) {
      return "Nickname cannot be empty.";
    }
    if (nickname.length < 3) {
        return "Nickname must be at least 3 characters long.";
      }
  
    const nicknamePattern = /^[A-Za-z0-9_-]+$/;
    if (!nicknamePattern.test(nickname)) {
      return "Nickname can only contain letters, numbers, underscores, and dashes.";
    }
  
    return null;
  };
  
  export const validateMessage = (message: string): string | null => {
    if (!message.trim()) {
      return "Message cannot be empty.";
    }
    if (message.length > 500) {
      return "Message cannot exceed 500 characters.";
    }
    return null;
  };