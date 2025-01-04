import { IsEmail } from "class-validator";
import { Gender } from "src/common/enums/gender.enum";
import { User } from "src/modules/auth/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Contact {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullName: string;

    @Column()
    @IsEmail({}, { message: 'Please provide a valid email' })
    email: string;

    @Column({
        nullable: false
    })
    phoneNumber: string;
    
    @Column({
        type: 'enum',
        enum: Gender,
        default: Gender.MALE
    })
    gender: Gender;

    // Add userId column for normalization
    @Column()
    userId: number;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' }) // This specifies which column to use for the relationship
    user: User;
}