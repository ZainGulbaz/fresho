import SectionName from "../commons/sectionname"

export default function About(){
 return (
  <section className="flex flex-col gap-8 mt-12 justify-center items-center">
     <SectionName subText="our story" mainText="about us"/>
     <div>
        <div className="max-w-3xl text-gray-500">
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore, ullam suscipit, illo distinctio obcaecati dignissimos est aspernatur doloremque repellendus veritatis veniam facere tempore quam labore delectus sed enim assumenda. Ea, quas obcaecati.</p>
        <p className="mt-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. At ducimus est ad!</p>
        <p className="mt-2">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam, saepe ipsam. Labore quis esse, id enim hic quisquam quidem reprehenderit distinctio similique iusto fugit.</p>
        </div>

        <section className="mt-12 flex flex-col justif-center items-center gap-4">
            <SectionName subText="Don't Hesitate" mainText="Contact Us"/>
            <h6 className="text-4xl font-extrabold">+92-336-4317217</h6>
        </section>
        
     </div>
 </section>)   
}