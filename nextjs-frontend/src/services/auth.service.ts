export class AuthService {
  constructor(private cookieStore?: any) {}

  async login(input: { email: string; password: string }) {
    const response = await fetch(`${process.env.ORDERS_API_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify({
        username: input.email,
        password: input.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 401) {
      return { error: "Credenciais inválidas" };
    }

    if (!response.ok) {
      const error = await response.json();
      return { error };
    }

    const data = await response.json();
    this.cookieStore.set("token", data.access_token); // ✅ funciona
  }

  logout() {
    this.cookieStore.delete("token");
  }

  getUser() {
    const token = this.cookieStore.get("token")?.value;
    if (!token) return null;

    const payloadBase64 = token.split(".")[1];
    const payloadDecoded = Buffer.from(payloadBase64, "base64").toString();
    return JSON.parse(payloadDecoded);
  }

  getToken() {
    return this.cookieStore.get("token")?.value ?? null;
  }

  isTokenExpired() {
    const user = this.getUser();
    if (!user) return true;

    const now = new Date();
    const exp = new Date(user.exp * 1000);
    return now > exp;
  }
}
