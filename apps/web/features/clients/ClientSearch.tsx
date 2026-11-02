import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Search } from 'lucide-react';

export default function ClientSearch() {
  return (
    <>
      <InputGroup className='max-w-xs'>
        <InputGroupInput placeholder='Search...' />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>
    </>
  );
}
