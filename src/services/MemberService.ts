import { Member } from '../models/members.js';
import fs from 'fs/promises';

const membersFilePath = ("./src/data/members.json");

export class MemberService {
    async readMembersFromFile(): Promise<Member[]> {
        const data = await fs.readFile(membersFilePath, 'utf-8');
        return JSON.parse(data);
    };
    async writeMembersToFile(members: Member[]): Promise<void> {
        await fs.writeFile(membersFilePath, JSON.stringify(members, null, 2));
    };
    async addMember(member: Member): Promise<Member> {
        const members = await this.readMembersFromFile();
        console.log("adding member", member);
        members.push(member);
        await this.writeMembersToFile(members);
        return member;
    };
    async getMembers(): Promise<Member[]> {
        return await this.readMembersFromFile();
    }
}