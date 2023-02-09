const info = document.querySelector('.info')



function createInfoBlock(subtitle, id, isTitle = false) {
    const infoBlock = document.createElement('div');
    const subTitle = document.createElement('div');
    const title = document.createElement('div');
    infoBlock.className = 'info__block';
    subTitle.className = 'info__block-subtitle fs-6 text-secondary-emphasis text-uppercase fw-bolder';
    title.className = 'info__block-title fs-2 text-dark fw-bolder';
    subTitle.innerText = subtitle
    if(isTitle)  title.innerHTML =  'UTC <span id="timezone"></span>';
    title.setAttribute('id', id)
    infoBlock.append(subTitle)
    infoBlock.append(title)
    return infoBlock
}

export function createInfo() {
    let oneBlock = createInfoBlock('Ip Adress', 'ip')
    let twoBlock = createInfoBlock('Location', 'location');
    let threeBlock = createInfoBlock('Timezone', 'timezone', true);
    let fourBlock = createInfoBlock('ISP', 'isp');
    info.append(oneBlock, twoBlock, threeBlock, fourBlock)
}



