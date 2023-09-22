import { Button } from '~/@shopify/polaris';
import { Link, usePage } from '~/@inertiajs/react';
import {
    IndexTable,
    IndexFilters,
    useSetIndexFiltersMode,
    useIndexResourceState,
    Text,
    VerticalStack,
    HorizontalStack,
    LegacyCard,
    Spinner,
    Pagination,
  } from '~/@shopify/polaris';

  import {useState, useCallback } from '~/react';

  function WishlistTable({ wishlist, pageInfo, customerId, isLoading, resetFilter, sortFilter, searchFilter }) {
    const { user } = usePage().props;
    const [selected, setSelected] = useState(0);
    const sortOptions = [
      {label: 'Order', value: 'order asc', directionLabel: 'Ascending'},
      {label: 'Order', value: 'order desc', directionLabel: 'Descending'},
    ];
    const [sortSelected, setSortSelected] = useState(['order asc']);


    const onSortHandler = (e) =>{
        setSortSelected(e);
        sortFilter(...sortSelected);
    }

    const {mode, setMode} = useSetIndexFiltersMode();
    const [queryValue, setQueryValue] = useState('');

    const onHandleCancel = () => {
        resetFilter();
        setQueryValue(' ');
    };





    const handleFiltersQueryChange = useCallback(
      (value) => {
        setQueryValue(value)
        searchFilter(value);
       },
      [],
    );

    const handleQueryValueRemove = useCallback(() => setQueryValue(''), []);
    const handleFiltersClearAll = useCallback(() => {
      handleQueryValueRemove();
    }, [
      handleQueryValueRemove,
    ]);


    const resourceName = {
      singular: 'wishlists',
      plural: 'wishlists',
    };

    const {selectedResources, allResourcesSelected, handleSelectionChange} =
      useIndexResourceState(wishlist);

    const rowMarkup = wishlist.map(
      (
        {id, name, isDefault, products, created_at },
        index,
      ) => (
        <IndexTable.Row
          id={id}
          key={id}
          selected={selectedResources.includes(id)}
          position={index}
        >
          <div style={{padding: '12px 16px', width: '100%'}}>
            <VerticalStack gap="1">
              <Text as="span" variant="bodySm" color="subdued">
                #{id} • {created_at}
              </Text>
              <HorizontalStack align="space-between">

                 <Text as="span" variant="bodyMd" fontWeight="semibold">
                        <Link href={`/customer/${customerId}/wishlist/${id}`}>
                            {name} {isDefault?'( Default )':''}
                         </Link> - Products ( {products} )
                 </Text>

                <Button destructive> Delete </Button>
              </HorizontalStack>
            </VerticalStack>
          </div>
        </IndexTable.Row>
      ),
    );



    return (
      <div style={{width: '100%'}}>
        <LegacyCard title="Wishlists">
          <>

            {isLoading?(
                <div style={{ textAlign:'center', padding:'30px 0px' }}>
                    <Spinner />
                </div>
            ):(
               <>
                 <IndexFilters
                    sortOptions={sortOptions}
                    sortSelected={sortSelected}
                    queryValue={queryValue}
                    queryPlaceholder="Searching in all"
                    onQueryChange={handleFiltersQueryChange}
                    onQueryClear={() => {}}
                    onSort={onSortHandler}
                    cancelAction={{
                    onAction: onHandleCancel,
                        disabled: false,
                        loading: false,
                    }}
                    tabs={[]}
                    selected={selected}
                    onSelect={setSelected}
                    filters={[]}
                    onClearAll={handleFiltersClearAll}
                    mode={mode}
                    setMode={setMode}
                    loading={isLoading}
                />
                <IndexTable
                    resourceName={resourceName}
                    itemCount={wishlist.length}
                    selectedItemsCount={allResourcesSelected ? 'All' : selectedResources.length}
                    condensed
                    onSelectionChange={handleSelectionChange}
                    headings={[
                        {title: 'Order'},
                        {title: 'Date'},
                        {title: 'Customer'},
                        {title: 'Total', alignment: 'end'},
                    ]}
                   >
                    {rowMarkup}
                </IndexTable>
               </>
            )}
          </>
        </LegacyCard>
        <div style={{
                width:'100%',
                display:'flex',
                justifyContent:'flex-end',
                padding:'20px 10px'
            }}>
            <Pagination
                hasPrevious={pageInfo?.prev?true:false}
                onPrevious={() => {
                    // setApi(`${pageInfo?.prev}&shop=${user.name}`);
                    console.log('prev');
                }}
                hasNext={pageInfo?.next?true:false}
                onNext={() => {
                    console.log('next');
                    // setApi(`${pageInfo?.next}&shop=${user.name}`);
                }}
            />
        </div>
      </div>
    );


  }


export default WishlistTable;
