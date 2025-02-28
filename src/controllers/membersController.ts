import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { Member } from "../models/members.js";
import { MemberService } from "../services/MemberService.js";

const memberService = new MemberService();

const validRoles = ["ux designer", "frontend developer", "backend developer"];

export const addMember = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, roles } = req.body;

    const invalidRoles = roles.filter(
      (role: string) => !validRoles.includes(role)
    );
    if (invalidRoles.length) {
      res.status(400).json({
        message: `Invalid roles: ${invalidRoles.join(", ")}`,
        validRoles,
      });
      return;
    }
    const newMember: Member = {
      id: uuidv4(),
      name,
      roles,
    };
    const member = await memberService.addMember(newMember);
    res.status(201).json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMembers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const members = await memberService.getMembers();
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
