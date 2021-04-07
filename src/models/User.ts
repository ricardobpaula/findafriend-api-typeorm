import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

export type UserRoleType = "admin" | "commom"

@Entity('users')
class User {

    @PrimaryGeneratedColumn('increment',{unsigned: true})
    id:number

    @Column({ name: 'first_name', nullable: false })
    firstName: string

    @Column({ name: 'last_name', nullable: false })
    lastName: string

    @Column({ name: 'user_name', unique: true, nullable: false })
    userName: string

    @Column({ unique:true, nullable: false })
    phone: string

    @Column({ unique:true, nullable: false })
    email: string

    @Column({ nullable: false })
    password: string

    @Column({ name: 'is_finding', nullable: false })
    isFinding: boolean

    @Column({
        type: "enum",
        enum: ["admin", "commom"],
        default: "commom"
    })
    role: UserRoleType

    @Column()
    avatar: string

    @CreateDateColumn({name: 'created_at'})
    public createdAt: Date
  
    @UpdateDateColumn({name: 'updated_at'})
    public updatedAt: Date
    
}

export default User