import { Inject, Injectable } from "@nestjs/common";
import { IUserRepository } from "./user.repository.interface";
import { User } from "../entities/user.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class UserRepositoy implements IUserRepository {
    private repository: Repository<User>;

    constructor(
        @Inject('DATA_SOURCE')
        private datasource: DataSource,
    ) {
        this.repository = this.datasource.getRepository(User);
    }
    
    async create(user: Partial<User>): Promise<User> {
        const newUser = this.repository.create(user);
        return await this.repository.save(newUser);
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.repository.findOne({ where: { email } });
    }

    async findById(id: number): Promise<User | null> {
        return await this.repository.findOne({ where: { id } });
    }

    async save(user: User): Promise<User> {
        return await this.repository.save(user);
    }
    
}