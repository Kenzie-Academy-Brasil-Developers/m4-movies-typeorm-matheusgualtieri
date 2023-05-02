import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("movies")
class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, type: "varchar", length: 50 })
  name: string;

  @Column({ nullable: true, type: "text" })
  description: string | null | undefined;

  @Column()
  duration: number;

  @Column()
  price: number;
}

export default Movie;
