import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from 'typeorm'

import User from './User'
import Photo from './Photo'

export type PetSizeType = 'small' | 'medium' | 'big'

export type PetSpecieType = 'dog' | 'bird' | 'cat'

@Entity('pets')
class Pet {
    
    @PrimaryGeneratedColumn('increment',{unsigned: true})
    id:number

    @Column({nullable:false})
    public name: string

    @Column({type:'text',nullable:false})
    public description: string

    @Column({
        type: 'enum',
        enum: ['dog', 'bird', 'cat'],
    })
    public specie: PetSpecieType

    @Column({
        type: 'enum',
        enum: ['small', 'medium', 'big'],
    })
    public size: PetSizeType

    @ManyToOne(()=>User)
    @JoinColumn({name:'owner_id'})
    public owner: User

    @OneToMany(type =>Photo, photo => Photo)
    public photos: Photo[]

    @CreateDateColumn({name: 'created_at'})
    public createdAt: Date
  
    @UpdateDateColumn({name: 'updated_at'})
    public updatedAt: Date

}

export default Pet