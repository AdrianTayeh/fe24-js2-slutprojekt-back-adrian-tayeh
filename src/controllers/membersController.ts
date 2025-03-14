import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { Member } from "../models/members.js";
import { MemberService } from "../services/MemberService.js";

const memberService = new MemberService();

const validRoles = ["ux", "frontend", "backend"];

/**
 * Controller function to add a new member.
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @param {NextFunction} next - The next middleware function.
 */
export const addMember = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, roles } = req.body;

    // Log the request body
    console.log("Request Body:", req.body);

    // Validate roles
    const invalidRoles = roles.filter(
      (role: string) => !validRoles.includes(role)
    );

    // Log the invalid roles
    console.log("Invalid Roles:", invalidRoles);

    if (invalidRoles.length) {
      res.status(400).json({
        message: `Invalid roles: ${invalidRoles.join(", ")}`,
        validRoles,
      });
      return;
    }

    // Create new member object
    const newMember: Member = {
      id: uuidv4(),
      name,
      roles,
    };

    // Add member using the service
    const member = await memberService.addMember(newMember);
    res.status(201).json(member);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller function to get all members.
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @param {NextFunction} next - The next middleware function.
 */
export const getMembers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const members = await memberService.getMembers();
    res.status(200).json(members);
  } catch (error) {
    next(error);
  }
};