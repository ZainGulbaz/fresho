type SectionNameProps={
    subText:string,
    mainText:string
}

export default function SectionName({subText,mainText}:SectionNameProps){
    return(<div className="flex flex-col gap-2 justify-center items-center">
    <h6 className="uppercase text-gray-400">{subText}</h6>
    <h4 className="text-2xl text-primary font-bold capitalize">{mainText}</h4>
    </div>)
}