import { Session } from "@/models/Session";
import { User } from "@/models/User";
import { AppResponse } from "@/types/response";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { connectDB } from "./db";

export const generateToken = (sessionId: string) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is missing.");
    }
    const token = jwt.sign({ sessionId }, process.env.JWT_SECRET);
    return token;
};

export const verifyToken = (token: string) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is missing.");
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
        return decode.sessionId;
    } catch (error) {
        console.log('Invalid token', error);
    }
};

export const getLoggedInUser = async (): Promise<AppResponse> => {

    await connectDB();

    const cookie = await cookies();

    try {
        const token = cookie.get("session_id")?.value;

        if (!token) {
            return {
                success: false,
                error: 'Token missing.'
            }
        }

        const sessionId = verifyToken(token);

        if (!sessionId) {
            return {
                success: false,
                error: 'Invalid token.'
            }
        }

        const session = await Session.findById(sessionId);

        if (!session) {
            return {
                success: false,
                error: 'Session expired.'
            }
        }

        const user = await User.findById(session.userId).select("-password -__v");

        if (!user) {
            return {
                success: false,
                error: "User not found. Please log in again."
            }
        }

        return {
            success: true,
            data: user
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            error: "Something went wrong."
        }
    }
}