import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

/**
 * @Method GET
 * @api http://localhost:3000/api/users/logout
 * @description  Logout for the user
 * @acsses public
 */
export async function GET(request: NextRequest) {
  try {
    cookies().delete("JwtToken");
    return NextResponse.json(
      { message: "Logout Succsessfuly!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error!" },
      { status: 500 }
    );
  }
}
