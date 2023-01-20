import Card from './Card';

const LabCard = () => (
  <Card>
    <>
      <h2 className='pb-4'>Lab Access</h2>
      <h5 className='pb-4 text-sm text-gray-400'>
        Request a VPN file to access the VM lab and vulnerable application labs
      </h5>
      <DownloadVPNButton />
    </>
  </Card>
);

const DownloadVPNButton = () => {
  return (
    <a
      href={`/api/wg`}
      className='inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-gray-100 border border-gray-300 rounded-lg  hover:border-gray-200 focus:ring-4 focus:ring-gray-200'
    >
      Download VPN
    </a>
  );
};

export default LabCard;
