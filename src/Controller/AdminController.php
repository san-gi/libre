<?php

namespace App\Controller;

use App\Entity\Chapitre;
use App\Form\ChapitreType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class AdminController extends AbstractController
{
    /**
     * @Route("/admin", name="admin")
     */
    public function index(Request $request)
    {
        $chapitre = new Chapitre;

        $form = $this->createForm(ChapitreType::class,$chapitre);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
   
            $chapitre->setDate(new \DateTime());
            

            

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($chapitre);
            $entityManager->flush();
            // do anything else you need here, like send an email

        }
        return $this->render('admin/index.html.twig', [
            'controller_name' => 'AdminController',
            'Chapitre' =>$form->createView()
        ]);
    }
}
