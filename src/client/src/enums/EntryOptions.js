export const EntryOptions = [
    {name: "Work", paid: true, color: "bg-warning text-dark"},
    {name: "Break", paid: false, color: "bg-secondary"},
    {name: "Doctor", paid: true, color: "bg-dark"},
    {name: "Holiday", paid: false, color: "bg-success"},
    {name: "Paid leave", paid: true, color: "bg-info"},
    {name: "Unpaid leave", paid: false, color: "bg-danger"},
]

export const TimeOptions = [
    ...EntryOptions,
    {name: "National holiday", paid: true, color: "bg-light text-dark"}
]