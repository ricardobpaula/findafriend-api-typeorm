import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import Pet from './Pet'

@Entity('photos')
 class Photo {
    
    @PrimaryGeneratedColumn('increment', {unsigned: true})
    id: number

    @Column({name: 'file_name', nullable: false})
    public fileName: string
    
    @ManyToOne(type => Pet, photos => Photo)
    @JoinColumn({name: 'pet_id'})
    public Pet: Pet

    @CreateDateColumn({name: 'created_at'})
    public createdAt: Date
  
    @UpdateDateColumn({name: 'updated_at'})
    public updatedAt: Date

}

export default Photo