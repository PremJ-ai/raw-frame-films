import { motion } from "framer-motion";
// ProjectCard creates a reusable portfolio tile with motion feedback and structured metadata.
export default function ProjectCard({project,large=false}:{project:any;large?:boolean}) {
  return <motion.article className={"project-card "+(large?"project-card--large":"")} whileHover={{y:-10}} transition={{type:"spring",stiffness:220,damping:18}}><div className="project-image"><img src={project.image} alt={project.title}/><span>{project.id}</span><div className="project-glow"/></div><div className="project-meta"><div><small>{project.client} · {project.year}</small><h3>{project.title}</h3></div><p>{project.type}</p></div><div className="tag-row">{project.tags.map((tag:string)=><i key={tag}>{tag}</i>)}</div></motion.article>;
}