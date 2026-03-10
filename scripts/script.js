console.log('js connected');

let allData = [];

const allIssues = () => {
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then((res) => res.json())
    .then((data) => {
        allData = data.data;
        displayIssues(allData);
    });
}

const displayIssues = (issues) => {
    manageSpinner(true);
    const totalIssue = document.getElementById('total-issue');
    totalIssue.innerText = issues.length;
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = "";

    issues.forEach(element => {
        const card = document.createElement('div');
        const date = new Date(element.createdAt);
        const formattedDate = date.toLocaleDateString(); 

        card.innerHTML = `
        <div class="p-4 space-y-3">
            <div class="flex justify-between">
                <div class="status-container"></div>
                <div class="priority-container">
                    <h2 class="text-[12px] font-medium">${element.priority.toUpperCase()}</h2>
                </div>
            </div>
            <h2 class="font-semibold text-[14px] line-clamp-2">${element.title}</h2>
            <p class="text-[12px] text-[#64748B] line-clamp-2">${element.description}</p>
            <div class="label-container flex items-center gap-1"></div>
        </div>
        <div class="border-t-2 border-t-[#E4E4E7] p-4">
            <p class="text-[12px] text-[#64748B]">#${element.id} ${element.author}</p>
            <p class="text-[12px] text-[#64748B]">${formattedDate}</p>
        </div>
        `;
        const statusContainer = card.querySelector('.status-container');
        const priorityContainer = card.querySelector('.priority-container');
        const priorityText = priorityContainer.querySelector('h2');
        const labelContainer = card.querySelector('.label-container');

        if (element.priority.toLowerCase() === 'high') {
            priorityContainer.classList.add('bg-[#FEECEC]', 'py-[6px]', 'px-[25px]', 'rounded-full');
            priorityText.classList.add('text-[#EF4444]');
        } else if (element.priority.toLowerCase() === 'medium') {
            priorityContainer.classList.add('bg-[#FFF6D1]', 'py-[6px]', 'px-[25px]', 'rounded-full');
            priorityText.classList.add('text-[#F59E0B]');
        } else {
            priorityContainer.classList.add('bg-[#EEEFF2]', 'py-[6px]', 'px-[25px]', 'rounded-full');
            priorityText.classList.add('text-[#9CA3AF]');
        }
        if (element.status === 'open') {
            statusContainer.innerHTML = `<img src="./assets/Open-Status.png" alt="">`;
            card.classList.add('card', 'bg-white', 'border-t-4', 'border-t-[#00A96E]', 'shadow');
        } else {
            statusContainer.innerHTML = `<img src="./assets/Closed- Status .png" alt="">`;
            card.classList.add('card', 'bg-white', 'border-t-4', 'border-t-[#A855F7]', 'shadow');
        }
        element.labels.forEach(label => {
            const labelDiv = document.createElement('div');
            labelDiv.classList.add('py-[6px]', 'px-[8px]', 'rounded-full', 'font-medium', 'text-[12px]');
            if (label.toLowerCase() === 'bug') {
                labelDiv.classList.add('bg-[#FEECEC]', 'text-[#EF4444]');
                labelDiv.innerHTML = `<i class="fa-solid fa-bug"></i> <span>${label}</span>`;
            } else if (label.toLowerCase() === 'help wanted') {
                labelDiv.classList.add('bg-[#fff8db]', 'text-[#D97706]');
                labelDiv.innerHTML = `<i class="fa-solid fa-life-ring"></i> <span>${label}</span>`;
            } else {
                labelDiv.classList.add('bg-[#EEEFF2]', 'text-[#64748B]');
                labelDiv.innerHTML = `<span>${label}</span>`;
            }
            labelContainer.appendChild(labelDiv);
        });

        cardContainer.appendChild(card);
    });
    manageSpinner(false);
}

const ActiveBtn = (activeId) => {
    const buttons = ['btn-all', 'btn-open', 'btn-closed'];
    buttons.forEach(id => {
        const btn = document.getElementById(id);
        if (id === activeId) {
            btn.classList.add('btn-primary');
            btn.classList.remove('text-gray-500');
        } else {
            btn.classList.remove('btn-primary');
            btn.classList.add('text-gray-500');
        }
    });
}

document.getElementById('btn-all').addEventListener('click', () => {
    displayIssues(allData);
    ActiveBtn('btn-all');
});
document.getElementById('btn-open').addEventListener('click', () => {
    displayIssues(allData.filter(card => card.status === 'open'));
    ActiveBtn('btn-open');
});
document.getElementById('btn-closed').addEventListener('click', () => {
    displayIssues(allData.filter(card => card.status === 'closed'));
    ActiveBtn('btn-closed');
});

const manageSpinner = (status) => {
    if(status == true){
        document.getElementById('spinner-container').classList.remove('hidden');
        document.getElementById('main-container').classList.add('hidden');
    }
    else{
        document.getElementById('spinner-container').classList.add('hidden');
        document.getElementById('main-container').classList.remove('hidden');
    }
}


document.getElementById('input-search').addEventListener('input', () => {
    const searchValue = document.getElementById('input-search').value.trim().toLowerCase();
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
        .then(res => res.json())
        .then(data => {
            displayIssues(data.data); 
        })
});


allIssues();
