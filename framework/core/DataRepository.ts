export class DataRepository {
  private static testData: Record<string, any> = {
    validUser: { email: process.env.VALID_USER_EMAIL, password: process.env.VALID_USER_PASSWORD },
    invalidUser: { username: "locked_user", password: "wrong_password" }
  };

  public static getUser(type: 'validUser' | 'invalidUser') {
    return this.testData[type];
  }
}