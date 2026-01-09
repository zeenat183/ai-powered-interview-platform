interface LoginDto {
    email: string;
    password: string;
  }

  interface RegisterDto {
    name: string;
    email: string;
    password: string;
  }
  
  export const loginUser = async (dto: LoginDto) => {
    const response = await fetch("http://localhost:3001/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dto),
    });
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Login failed");
    }
  
    return response.json(); // should contain token or user info
  };
    
  export const registerUser = async (dto: RegisterDto) => {
    const response = await fetch("http://localhost:3001/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dto),
    });
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Registration failed");
    }
  
    return response.json(); // confirmation or user object
  };
  