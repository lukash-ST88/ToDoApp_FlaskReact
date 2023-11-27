
import { useState } from "react"
import MySelect from "../UI/MySelect/MySelect"
import { getSortValues } from "../../utils/sortValues";



interface IFilter {
    sort: string;
    order: string;
  }

interface FilterProps {
    sorter: IFilter,
    setSorter(arg: IFilter): void
}

const Sorter = (props: FilterProps) => {
    return (
    <div className="m-2">
      <MySelect
        value={props.sorter.sort}
        onChange={(selectedValue) => {
          const [sortValue, orderValue] = getSortValues(selectedValue)
          props.setSorter({ ...props.sorter, sort: sortValue, order: orderValue });
        }}
        defaultValue="SORT BY"
        options={[
          { value: "username desc", name: "username - descending"},
          { value: "username asc", name: "username  - ascending"},
          { value: "email desc", name: "email - descending" },
          { value: "email asc", name: "email - ascending" },
          { value: "is_done asc", name: "is_done - ascending" },
          { value: "is_done desc", name: "is_done - descending" }
        ]}
      />
    </div>)
}
export default Sorter;