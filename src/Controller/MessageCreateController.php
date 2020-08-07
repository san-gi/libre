<?php

namespace App\Controller;

use App\Entity\Message;
use Symfony\Component\Security\Core\Security;

class MessageCreateController 
{

    private $security;

    public function __construct(Security $security)
    {
        $this->security=$security;
    }
 
    public function __invoke(Message $data)
    {
    
        $data->setAuthor($this->security->getUser());
        $data->setDate(date('Y-m-d H:i:sP'));
        return $data;
    }
}
