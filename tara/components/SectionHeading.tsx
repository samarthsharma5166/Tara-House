import React from 'react'

const SectionHeading = ({heading,style}:{heading:string,style?:string}) => {
  return (
    <div>
          <h1 className={style? style:'text-[32px] p-2 pb-2 text-center alegreya-sans-bold'}>{heading}</h1>
    </div>
  )
}

export default SectionHeading