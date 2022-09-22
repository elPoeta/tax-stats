import DynamicHeroIcon from '../common/DynamicHeroIcons'

export const TaxItem = ({name, icon}:{name:string, icon:string}) => {
  return (
    <div className='flex flex-row items-center justify-center p-4  border-2 border-[#0ea5e9] rounded-md'>
      <DynamicHeroIcon icon={icon} classNames='w-10 h-10 fill-[#0ea5e9]' />
      <span className='font-bold ml-2'>{name}</span>
    </div>
  )
}
