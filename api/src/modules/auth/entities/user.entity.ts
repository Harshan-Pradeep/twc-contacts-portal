import { Exclude } from "class-transformer";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Contact } from "src/modules/contact/entities/contact.entity";
import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Index("idx_user_email", { unique: true })
    @IsEmail({}, { message: 'Please provide a valid email' })
    @IsNotEmpty()
    email: string;

    @Column()
    @Exclude({ toPlainOnly: true })
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @IsNotEmpty()
    password: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdDate: Date;

    // The relationship is now properly normalized
    @OneToMany(() => Contact, contact => contact.user)
    contacts: Contact[];
}