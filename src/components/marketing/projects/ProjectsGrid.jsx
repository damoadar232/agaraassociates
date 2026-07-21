import { memo } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/components/marketing/motion";
import { ProjectCard } from "@/components/marketing/projects/ProjectCard";

function ProjectsGridComponent({ projects }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
    >
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </motion.div>
  );
}

export const ProjectsGrid = memo(ProjectsGridComponent);
