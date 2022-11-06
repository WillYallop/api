interface FilterQuery {
  [key: string]: string;
}

interface QueryBuilderProps {
  filter?: FilterQuery;
  sort?: string;
  page?: string;
}

const queryBuilder = (props: QueryBuilderProps) => {
  const { filter, sort, page } = props;

  return "";
};
export default queryBuilder;
