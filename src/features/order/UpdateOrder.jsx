import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from '../../ui/Button';
import { updateOrder } from '../../services/apiUpdateOrder';

const UpdateOrder = ({ order }) => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: ({ id, updateObj }) => updateOrder(id, updateObj),
    onSuccess: () => {
      queryClient.invalidateQueries(['order', order.id]);
    },
  });

  const handleClickPriority = () => {
    mutate({ id: order.id, updateObj: { priority: true } });
  };

  return (
    <div className="text-right">
      <Button type="primary" onClick={handleClickPriority} disabled={isPending}>
        {isPending ? 'Updating' : 'Make Priority'}
      </Button>
      {error && <p className="text-red-500">Failed to update priority.</p>}
    </div>
  );
};

export default UpdateOrder;
