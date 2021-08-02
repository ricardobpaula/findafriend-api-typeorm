import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm'
import Pet from './Pet'

export type UserRoleType = 'admin' | 'commom'

@Entity('users')
class User {

    @PrimaryGeneratedColumn('increment',{unsigned: true})
    id:number

    @Column({ name: 'first_name', nullable: false })
    public firstName: string

    @Column({ name: 'last_name', nullable: false })
    public lastName: string

    @Column({ unique:true, nullable: false })
    public phone: string

    @Column({ unique:true, nullable: false })
    public email: string

    @Column({ nullable: false })
    public password: string

    @Column({ name: 'is_finding', nullable: false })
    public isFinding: boolean

    @Column({
        type: 'enum',
        enum: ['admin', 'commom'],
        default: 'commom'
    })
    public role: UserRoleType

    @Column({
        name: 'is_ong',
        default: false
    })
    public isOng: boolean

    @Column()
    public avatar: string

    @OneToMany(type =>Pet, pet => Pet)
    public pets: Pet[]

    @CreateDateColumn({name: 'created_at'})
    public createdAt: Date
  
    @UpdateDateColumn({name: 'updated_at'})
    public updatedAt: Date
    
}

export default User